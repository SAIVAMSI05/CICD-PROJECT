package com.klef.sdp.controller;

import com.klef.sdp.model.User;
import com.klef.sdp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin("*")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    // -------- SIGNUP --------
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody User user) {
        try {
            User savedUser = userService.signup(user);
            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body("{\"message\":\"User registered successfully\", \"username\":\"" 
                          + savedUser.getUsername() + "\"}");
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("{\"error\":\"Signup failed: " + e.getMessage() + "\"}");
        }
    }

    // -------- LOGIN --------
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        try {
            User loggedInUser = userService.login(user.getUsername(), user.getPassword());

            if (loggedInUser == null) {
                return ResponseEntity
                        .status(HttpStatus.UNAUTHORIZED)
                        .body("{\"error\":\"Invalid username or password\"}");
            }

            // RETURN THE ID ALSO!
            String json = "{"
                    + "\"message\":\"Login successful\","
                    + "\"id\":" + loggedInUser.getId() + ","
                    + "\"username\":\"" + loggedInUser.getUsername() + "\""
                    + "}";

            return ResponseEntity.ok(json);

        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("{\"error\":\"Login failed: " + e.getMessage() + "\"}");
        }
    }

    
    @GetMapping("/profile/{username}")
    public ResponseEntity<?> getProfile(@PathVariable String username) {
        User user = userService.findByUsername(username);
        if (user == null) return ResponseEntity.status(404).body("{\"error\":\"User not found\"}");

        return ResponseEntity.ok(user);
    }

}
