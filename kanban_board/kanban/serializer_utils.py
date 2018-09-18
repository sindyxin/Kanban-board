def get_user_full_name(user_object):
    """
    Get the combined first and last name of the user, or the username if neither one exists

    :param user_object: User model
    :return: String
    """

    first_name = user_object.first_name
    last_name = user_object.last_name

    if first_name and last_name:
        full_name = first_name + ' ' + last_name
    elif first_name:
        full_name = first_name
    elif last_name:
        full_name = first_name
    else:
        full_name = user_object.username

    return full_name