package com.klef.sdp.service;

import com.klef.sdp.model.Food;
import com.klef.sdp.model.Manager;
import com.klef.sdp.repository.FoodRepository;
import com.klef.sdp.repository.ManagerRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FoodServiceImpl implements FoodService {

    @Autowired
    private FoodRepository foodRepository;
    
    @Autowired
    private ManagerRepository managerRepository;

    @Override
    public Food addFood(Food food) {

        Long managerId = food.getManager().getId();

        Manager existingManager = managerRepository.findById(managerId)
            .orElseThrow(() -> new RuntimeException("Manager not found"));

        food.setManager(existingManager);

        return foodRepository.save(food);
    }

    @Override
    public void deleteFood(Long id) {
        foodRepository.deleteById(id);
    }


    @Override
    public List<Food> getAllFoods() {
        return foodRepository.findAll();
    }
    
    @Override
    public Food findFoodByIdForManager(Long managerId, Long foodId) {
        return foodRepository.findById(foodId)
                .filter(f -> f.getManager().getId().equals(managerId))
                .orElseThrow(() -> new RuntimeException("Food not found for this manager"));
    }

    @Override
    public Food findFoodByNameForManager(Long managerId, String name) {
        return foodRepository.findAll()
                .stream()
                .filter(f -> f.getManager().getId().equals(managerId)
                          && f.getName().equalsIgnoreCase(name))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Food not found for this manager"));
    }

    @Override
    public Food updateFoodForManager(Long managerId, Long foodId, Food updatedFood) {
        Food existing = foodRepository.findById(foodId)
                .filter(f -> f.getManager().getId().equals(managerId))
                .orElseThrow(() -> new RuntimeException("Food not found or does not belong to this manager"));

        existing.setName(updatedFood.getName());
        existing.setPrice(updatedFood.getPrice());
        existing.setAvailable(updatedFood.getAvailable());

        return foodRepository.save(existing);
    }
    
    @Override
    public List<Food> getAvailableFoods() {
        return foodRepository.findByAvailableIgnoreCase("YES");
    }


}