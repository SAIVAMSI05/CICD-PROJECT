package com.klef.sdp.service;

import com.klef.sdp.model.Manager;
import com.klef.sdp.repository.ManagerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ManagerServiceImpl implements ManagerService {

    @Autowired
    private ManagerRepository managerRepo;

    @Override
    public Manager registerManager(Manager manager) {
        // Check if email already exists
        if (managerRepo.findByEmail(manager.getEmail()) != null) {
            throw new RuntimeException("Email already exists!");
        }
        return managerRepo.save(manager);
    }

    @Override
    public Manager login(String email, String password) {
        Manager manager = managerRepo.findByEmail(email);
        if (manager != null && manager.getPassword().equals(password)) {
            return manager;
        }
        return null;
    }
}
