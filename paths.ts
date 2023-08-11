/*!
 * Copyright © 2023 United States Government as represented by the
 * Administrator of the National Aeronautics and Space Administration.
 * All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { access } from 'fs/promises'
import type { PathLike } from 'fs'

export async function exists(path: PathLike) {
  try {
    await access(path)
  } catch {
    return false
  }
  return true
}
