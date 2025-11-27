package com.klef.sdp.controller;

import com.klef.sdp.model.Manager;
import com.klef.sdp.service.ManagerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/manager")
@CrossOrigin("*")
public class ManagerController {

    @Autowired
    private ManagerService managerService;

    // ---- Signup ----
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Manager manager) {
        try {
            return ResponseEntity.ok(managerService.registerManager(manager));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // ---- Login ----
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Manager manager) {
        Manager loggedIn = managerService.login(manager.getEmail(), manager.getPassword());
        if (loggedIn != null) {
            return ResponseEntity.ok(loggedIn);
        } else {
            return ResponseEntity.status(401).body("Invalid email or password");
        }
    }
}
