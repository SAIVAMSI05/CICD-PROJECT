package com.klef.sdp.service;

import com.klef.sdp.model.User;

public interface UserService {
    User signup(User user);
    User login(String username, String password);
	User findByUsername(String username);
}
