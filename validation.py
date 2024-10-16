import re


def is_valid_email(email):
    email_regex = r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$'

    if re.match(email_regex, email):
        return True
    else:
        return False


def is_valid_phone(phone):
    phone_regex = r'^\+?[\d\s]{7,15}$'

    if re.match(phone_regex, phone):
        return True
    else:
        return False

