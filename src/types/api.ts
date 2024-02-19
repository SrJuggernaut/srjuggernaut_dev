// TODO: La clase ApiError no es un tipo, debería moverla a un archivo aparte
export class ApiError extends Error {
  status: number
  message: string
  constructor (status: number, message: string) {
    super(message)
    this.status = status
    this.message = message
    Object.setPrototypeOf(this, ApiError.prototype)
  }
}

export interface ApiResponse<T> {
  message: string
  data?: T
}

export interface ApiErrorResponse {
  error: string
}
