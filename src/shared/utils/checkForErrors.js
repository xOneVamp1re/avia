const checkForErrors = (error) => {
  const errorsData = [
    {
      status_code: 400,
      message: 'Некорректные данные.',
      info: 'Эта ошибка возникает, когда пользователь вводит некорректные данные',
    },
    {
      status_code: 401,
      message: 'Нет доступа.',
      info: 'Эта ошибка возникает, когда пользователь не авторизован',
    },
    {
      status_code: 403,
      message: 'Доступ запрещен.',
      info: 'Эта ошибка возникает, когда у пользователя нет прав для выполнения данного действия.',
    },
    {
      status_code: 404,
      message: 'Результатов по вашему запросу не найдено.',
      info: 'Эта ошибка обычно возникает по причине ошибки в запросе. Проверьте правильность запроса, убедитесь, что введенные данные верны.',
    },
    {
      status_code: 408,
      message: 'Время ожидания запроса истекло.',
      info: 'Эта ошибка возникает, когда сервер не получает полный запрос от клиента в течение установленного времени.',
    },
    {
      status_code: 409,
      message: 'Конфликт.',
      info: 'Эта ошибка возникает, когда запрос не может быть выполнен из-за конфликта с текущим состоянием ресурса.',
    },
    {
      status_code: 429,
      message: 'Слишком много запросов.',
      info: 'Эта ошибка возникает, когда количество запросов превышает допустимое количество',
    },
    {
      status_code: 500,
      message: 'Внутренняя ошибка сервера.',
      info: 'Эта ошибка возникает, когда сервер не может выполнить запрос',
    },
    {
      status_code: 503,
      message: 'Сервис недоступен.',
      info: 'Эта ошибка возникает, когда сервер временно недоступен из-за перегрузки или проведения технического обслуживания.',
    },
    {
      status_code: 504,
      message: 'Время ожидания ответа от сервера истекло.',
      info: 'Эта ошибка возникает, когда сервер не получает ответ от другого сервера в установленное время.',
    },
  ]

  for (const { status_code, message } of errorsData) {
    if (status_code === error) {
      /* const CustomError = new Error(message)
      CustomError.info = info
      throw CustomError */
      return message
    }
  }

  /*   const defaultError = new Error('Неизвестная ошибка.')
  defaultError.info = 'Произошла ошибка, которую не удалось идентифицировать.'
  throw defaultError */
  return 'Неизвестная ошибка.'
}

export default checkForErrors
