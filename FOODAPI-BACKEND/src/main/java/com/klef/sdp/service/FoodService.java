package com.klef.sdp.service;

import com.klef.sdp.model.Food;
import java.util.List;

public interface FoodService {
    Food addFood(Food food);
    void deleteFood(Long id);
    List<Food> getAllFoods();
    
    Food findFoodByIdForManager(Long managerId, Long foodId);
    Food findFoodByNameForManager(Long managerId, String name);
    Food updateFoodForManager(Long managerId, Long foodId, Food updatedFood);
	List<Food> getAvailableFoods();
}
