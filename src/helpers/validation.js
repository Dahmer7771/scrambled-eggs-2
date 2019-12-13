const regExp = {
    letters: /^(\d*([a-zA-Z]{1,})\d*)*$/,
    email: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    password: /^[a-z0-9]+$/,
};

const MESSAGES = {
    USERNAME_MESSAGE: {
        invalidCharacters: "use only letters and numbers",
        tooShortUsername: "too short username",
        tooLongUsername: "too long username",
    },
    EMAIL_MESSAGE: {
        invalidEmail: "invalid email",
    },
    PASSWORD_MESSAGE: {
        invalidPassword: "invalid password",
        tooShortPassword: "too short password",
        tooLongPassword: "too long password",
    },
};

const success = (fieldName, value) => ({
    status: "success",
    fieldName,
    value,
});

const error = (fieldName, value, errorMessage) => ({
    status: "error",
    error: errorMessage,
    fieldName,
    value,
});

const formValidation = (fieldName, value) => {
    const field = {
        USERNAME_LOGIN: "usernameLogin",
        USERNAME_REGISTRATION: "usernameRegistration",
        PASSWORD_LOGIN: "passwordLogin",
        PASSWORD_REGISTRATION: "passwordRegistration",
        PASSWORD_CONFIRM_REGISTRATION: "passwordConfirmRegistration",
        EMAIL_REGISTRATION: "emailRegistration",
    };

    switch (fieldName) {
    case field.USERNAME_LOGIN:
        if (regExp.letters.test(value)) {
            if (value.length <= 20 && value.length > 3) {
                return success(fieldName, value);
            } if (value.length > 20) {
                return error(fieldName, value, MESSAGES.USERNAME_MESSAGE.tooLongUsername);
            }
            return error(fieldName, value, MESSAGES.USERNAME_MESSAGE.tooShortUsername);
        }
        return error(fieldName, value, MESSAGES.USERNAME_MESSAGE.invalidCharacters);
    case field.USERNAME_REGISTRATION:
        if (regExp.letters.test(value)) {
            if (value.length <= 20 && value.length > 3) {
                return success(fieldName, value);
            } if (value.length > 20) {
                return error(fieldName, value, MESSAGES.USERNAME_MESSAGE.tooLongUsername);
            }
            return error(fieldName, value, MESSAGES.USERNAME_MESSAGE.tooShortUsername);
        }
        return error(fieldName, value, MESSAGES.USERNAME_MESSAGE.invalidCharacters);
    case field.EMAIL_REGISTRATION:
        if (regExp.email.test(value)) {
            return success(fieldName, value);
        }
        return error(fieldName, value, MESSAGES.EMAIL_MESSAGE.invalidEmail);
    case field.PASSWORD_LOGIN:
        if (regExp.password.test(value)) {
            if (value.length <= 20 && value.length > 5) {
                return success(fieldName, value);
            } if (value.length > 20) {
                return error(fieldName, value, MESSAGES.PASSWORD_MESSAGE.tooLongPassword);
            }
            return error(fieldName, value, MESSAGES.PASSWORD_MESSAGE.tooShortPassword);
        }
        return error(fieldName, value, MESSAGES.PASSWORD_MESSAGE.invalidPassword);
    case field.PASSWORD_REGISTRATION:
        if (regExp.password.test(value)) {
            if (value.length < 20 && value.length > 5) {
                return success(fieldName, value);
            } if (value.length > 20) {
                return error(fieldName, value, MESSAGES.PASSWORD_MESSAGE.tooLongPassword);
            }
            return error(fieldName, value, MESSAGES.PASSWORD_MESSAGE.tooShortPassword);
        }
        return error(fieldName, value, MESSAGES.PASSWORD_MESSAGE.invalidPassword);
    case field.PASSWORD_CONFIRM_REGISTRATION:
        if (regExp.password.test(value)) {
            if (value.length < 20 && value.length > 5) {
                return success(fieldName, value);
            } if (value.length > 20) {
                return error(fieldName, value, MESSAGES.PASSWORD_MESSAGE.tooLongPassword);
            }
            return error(fieldName, value, MESSAGES.PASSWORD_MESSAGE.tooShortPassword);
        }
        return error(fieldName, value, MESSAGES.PASSWORD_MESSAGE.invalidPassword);
    default:
        return false;
    }
};

export default formValidation;
