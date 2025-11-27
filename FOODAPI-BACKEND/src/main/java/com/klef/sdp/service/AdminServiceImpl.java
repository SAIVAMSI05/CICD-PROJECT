package com.klef.sdp.service;

import com.klef.sdp.model.Admin;
import com.klef.sdp.model.Manager;
import com.klef.sdp.model.User;
import com.klef.sdp.repository.AdminRepository;
import com.klef.sdp.repository.ManagerRepository;
import com.klef.sdp.repository.UserRepository;
import com.klef.sdp.repository.FoodRepository;
import com.klef.sdp.repository.OrderRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class AdminServiceImpl implements AdminService {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private ManagerRepository managerRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private FoodRepository foodRepository;

    @Autowired
    private OrderRepository orderRepository;

    @PersistenceContext
    private EntityManager em;

    @Override
    public Admin register(Admin admin) {
        if (adminRepository.findByEmail(admin.getEmail()) != null) {
            throw new RuntimeException("Email already registered!");
        }
        return adminRepository.save(admin);
    }

    @Override
    public Admin login(String email, String password) {
        return adminRepository.findByEmailAndPassword(email, password);
    }

    @Override
    public Manager addManager(Manager manager) {
        return managerRepository.save(manager);
    }

    /**
     * Safe delete flow:
     * 1) fetch only food IDs for the manager (no entity graphs)
     * 2) bulk delete orders by those food IDs
     * 3) bulk delete foods by manager id
     * 4) flush & clear persistence context
     * 5) delete manager
     */
    @Override
    @Transactional
    public void deleteManager(Long managerId) {
        // 1) get food ids (avoid loading full Food entities)
        List<Long> foodIds = foodRepository.findIdsByManagerId(managerId);

        if (foodIds != null && !foodIds.isEmpty()) {
            // 2) bulk delete orders referencing those foods
            orderRepository.deleteByFoodIdIn(foodIds);

            // 3) bulk delete foods for this manager
            foodRepository.deleteByManagerId(managerId);
        }

        // 4) flush & clear to avoid persistence-context mixups
        em.flush();
        em.clear();

        // 5) finally delete manager
        managerRepository.deleteById(managerId);
    }

    @Override
    public User addUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}
