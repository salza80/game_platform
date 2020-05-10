function parseFormValidationErrors(error) {
  let validationErrors = {}
  if (error && error.graphQLErrors && Array.isArray(error.graphQLErrors)) {
    error.graphQLErrors.forEach((error) => {
      if (error.extensions && error.extensions.code === 'VALIDATION_ERROR' && error.extensions.problems && Array.isArray(error.extensions.problems)) {
        error.extensions.problems.forEach((problem) => {
          try {
            validationErrors[problem.path[0]] = problem.explanation[0]
          } catch (e) {}
        })
      }
    })
  }
  return validationErrors
}

export { parseFormValidationErrors }