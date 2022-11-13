import SuitInformation = jasmine.JasmineStartedInfo
import { DisplayProcessor, SpecReporter, StacktraceOption } from 'jasmine-spec-reporter'

class Proccessor extends DisplayProcessor {
  public override displayJasmineStarted(
    Informations: SuitInformation,
    WriteLogging: string
  ): string {
    return `TypeScript ${WriteLogging}`
  }
}

jasmine.getEnv().clearReporters()
jasmine.getEnv().addReporter(
  new SpecReporter({
    spec: {
      displayStacktrace: StacktraceOption.NONE
    },
    customProcessors: [Proccessor]
  })
)
