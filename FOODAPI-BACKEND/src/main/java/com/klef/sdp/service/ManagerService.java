package com.klef.sdp.service;

import com.klef.sdp.model.Manager;

public interface ManagerService {
    Manager registerManager(Manager manager);
    Manager login(String email, String password);
}
