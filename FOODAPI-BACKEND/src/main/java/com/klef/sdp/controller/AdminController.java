package com.klef.sdp.controller;

import com.klef.sdp.service.AdminService;
import com.klef.sdp.model.Manager;
import com.klef.sdp.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*") // allow Postman / frontend (DEV)
public class AdminController {

    @Autowired
    private AdminService adminService;

    @PostMapping("/register")
    public ResponseEntity<?> signup(@RequestBody com.klef.sdp.model.Admin admin) {
        try {
            var saved = adminService.register(admin);
            return ResponseEntity.ok(saved);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody com.klef.sdp.model.Admin admin) {
        var loggedIn = adminService.login(admin.getEmail(), admin.getPassword());
        if (loggedIn != null) {
            return ResponseEntity.ok(loggedIn);
        } else {
            return ResponseEntity.status(401).body("Invalid email or password");
        }
    }

    @PostMapping("/addManager")
    public ResponseEntity<?> addManager(@RequestBody Manager manager) {
        return ResponseEntity.ok(adminService.addManager(manager));
    }

    @DeleteMapping("/deleteManager/{id}")
    public ResponseEntity<?> deleteManager(@PathVariable Long id) {
        try {
            adminService.deleteManager(id);
            return ResponseEntity.ok("Manager deleted successfully!");
        } catch (org.springframework.dao.EmptyResultDataAccessException ex) {
            return ResponseEntity.status(404).body("Manager not found with id: " + id);
        } catch (Exception ex) {
            return ResponseEntity.status(500).body("Error deleting manager: " + ex.getMessage());
        }
    }

    @PostMapping("/addUser")
    public ResponseEntity<?> addUser(@RequestBody User user) {
        return ResponseEntity.ok(adminService.addUser(user));
    }

    @DeleteMapping("/deleteUser/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        try {
            adminService.deleteUser(id);
            return ResponseEntity.ok("User deleted successfully!");
        } catch (org.springframework.dao.EmptyResultDataAccessException ex) {
            return ResponseEntity.status(404).body("User not found with id: " + id);
        } catch (Exception ex) {
            return ResponseEntity.status(500).body("Error deleting user: " + ex.getMessage());
        }
    }
}
