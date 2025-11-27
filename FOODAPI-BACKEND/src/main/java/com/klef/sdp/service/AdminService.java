package com.klef.sdp.service;

import com.klef.sdp.model.Admin;
import com.klef.sdp.model.Manager;
import com.klef.sdp.model.User;

public interface AdminService {
    Admin register(Admin admin);
    Admin login(String email, String password);

    // Manage Managers
    Manager addManager(Manager manager);
    void deleteManager(Long id);

    // Manage Users
    User addUser(User user);
    void deleteUser(Long id);
}
