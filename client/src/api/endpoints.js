export const USER_ENDPOINTS = {
    create: 'user/create',
    read: 'user/read',
    patch: 'user/update',
    login: 'user/login',
    logout: 'user/logout',
    validate_session: 'user/validateSession',
    getProfilePicture: 'user/getProfilePicture',
    changeProfilePicture: 'user/changeProfilePicture',
};

export const ADMIN_ENDPOINTS = {
    create: 'admin/create',
    readAll: 'admin/readUsers',
    update_prefix_id: 'admin/updatePrefixId',
};

export const COMMENT_ENDPOINTS = {
    create: 'comment/create',
    read: 'comment/read',
};

export const ROOM_ENDPOINTS = {
    create: 'roomreservation/create',
    read: 'roomreservation/read',
    readAll: 'roomreservation/readAll',
    patch: 'roomreservation/update',
};

export const ANNOUNCEMENT_ENDPOINTS = {
    create: 'announcement/create',
    read: 'announcement/read',
    patch: 'announcement/update',
    delete: 'announcement/delete',
};
