export class ValidateHelper {
  /**
   * Check the email valid or invalid.
   * @param email - The email to be check.
   * @returns True if valid or false if invalid.
   */
  public static isValidEmail(email: string) {
    const regex: RegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    return regex.test(email)
  }

  /**
   * Check the password valid or invalid.
   * @param password - The password to be check.
   * @returns True if valid or false if invalid.
   */
  public static isValidPassword(password: string) {
    const regex: RegExp = /^[a-zA-Z0-9!@#$%^&*()_+-={}|;:'",.<>/?]{8,}$/
    return regex.test(password)
  }

  /**
   * Check the phone number valid or invalid.
   * @param phone - The phone number to be check.
   * @returns True if valid or false if invalid.
   */
  public static isValidPhoneNumber = (phone: string) => {
    const regex: RegExp = /^((0[2-9]|84[2-9]|\+84[2-9])(\d{8})|1[8-9]00\d{4})$/
    return regex.test(phone)
  }

  /**
   * Check the url valid or invalid.
   * @param urlString - The url to be check.
   * @returns True if valid or false if invalid.
   */
  public static isValidUrl(urlString: string) {
    const pattern = new RegExp('^(https?:\\/\\/)?' // protocol
        + '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' // domain name
        + '((\\d{1,3}\\.){3}\\d{1,3}))' // OR ip (v4) address
        + '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' // port and path
        + '(\\?[;&a-z\\d%_.~+=-]*)?' // query string
        + '(\\#[-a-z\\d_]*)?$', 'i') // fragment locator
    return !!pattern.test(urlString)
  }
}
