package com.klef.sdp.service;

import com.klef.sdp.model.User;
import com.klef.sdp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User signup(User user) {
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            throw new RuntimeException("Username already taken");
        }
        // Store password directly (plain text)
        return userRepository.save(user);
    }

    @Override
    public User login(String username, String password) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Invalid username or password"));

        if (!user.getPassword().equals(password)) {
            throw new RuntimeException("Invalid username or password");
        }
        return user;
    }
    
    public User findByUsername(String username) {
        return userRepository.findByUsername(username).orElse(null);
    }

}
