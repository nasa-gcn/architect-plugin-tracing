/*!
 * Copyright © 2022 United States Government as represented by the Administrator
 * of the National Aeronautics and Space Administration. No copyright is claimed
 * in the United States under Title 17, U.S. Code. All Other Rights Reserved.
 *
 * SPDX-License-Identifier: NASA-1.3
 */

import { join } from 'path'
import { exists } from './paths'

export const deploy = {
  async start({
    cloudformation,
    inventory: {
      inv: { lambdasBySrcDir },
    },
  }: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    cloudformation: { Resources: Record<string, any> }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    inventory: { inv: { lambdasBySrcDir: Record<string, any> } }
  }) {
    let hasTracing

    const cfnBySrcDir = Object.fromEntries(
      Object.values(cloudformation.Resources)
        .filter(({ Type }) => Type === 'AWS::Serverless::Function')
        .map(({ Properties }) => [Properties.CodeUri, Properties])
    )

    await Promise.all(
      Object.entries(lambdasBySrcDir).map(async ([path, { config }]) => {
        if (!config.tracing) return
        hasTracing = true

        const props = cfnBySrcDir[path]
        const layers = props.Layers ?? (props.Layers = [])

        props.Tracing = 'Active'
        layers.push({
          'Fn::Sub': `arn:aws:lambda:\${AWS::Region}:901920570463:layer:aws-otel-nodejs-${config.architecture}-ver-1-9-1:1`,
        })

        props.Environment.Variables.AWS_LAMBDA_EXEC_WRAPPER =
          '/opt/otel-handler'

        if (await exists(join(path, 'tracing.js'))) {
          props.Environment.Variables.NODE_OPTIONS =
            '--require /var/task/tracing.js'
        }
      })
    )

    if (hasTracing) {
      const roleProps = cloudformation.Resources.Role.Properties
      ;(roleProps.ManagedPolicyArns ?? (roleProps.ManagedPolicyArns = [])).push(
        'arn:aws:iam::aws:policy/AWSXRayDaemonWriteAccess'
      )
    }

    return cloudformation
  },
}
