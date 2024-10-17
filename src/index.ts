import {executeAutomagically} from './executeAutomagically'
import core from '@actions/core'
import github from '@actions/github'

await executeAutomagically({
  core,
  github
})
