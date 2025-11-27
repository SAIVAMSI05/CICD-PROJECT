package com.klef.sdp.repository;

import com.klef.sdp.model.Manager;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ManagerRepository extends JpaRepository<Manager, Long> {
    Manager findByEmail(String email);
}
