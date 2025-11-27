package com.klef.sdp.controller;

import com.klef.sdp.model.Food;
import com.klef.sdp.service.FoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/food")
@CrossOrigin("*")
public class FoodController {

    @Autowired
    private FoodService foodService;

    @PostMapping("/add")
    public Food addFood(@RequestBody Food food) {
        return foodService.addFood(food);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteFood(@PathVariable Long id) {
        foodService.deleteFood(id);
        return "Food deleted successfully";
    }

    @GetMapping("/all")
    public List<Food> getAllFoods() {
        return foodService.getAllFoods();
    }
    
 // 1) search by ID for a manager
    @GetMapping("/manager/{managerId}/by-id/{foodId}")
    public ResponseEntity<?> getFoodByIdForManager(
            @PathVariable Long managerId,
            @PathVariable Long foodId) {
        try {
            Food f = foodService.findFoodByIdForManager(managerId, foodId);
            return ResponseEntity.ok(f);
        } catch (RuntimeException ex) {
            return ResponseEntity.status(404).body(ex.getMessage());
        }
    }

    // 2) search by name for a manager
    @GetMapping("/manager/{managerId}/by-name")
    public ResponseEntity<?> getFoodByNameForManager(
            @PathVariable Long managerId,
            @RequestParam String name) {
        try {
            Food f = foodService.findFoodByNameForManager(managerId, name);
            return ResponseEntity.ok(f);
        } catch (RuntimeException ex) {
            return ResponseEntity.status(404).body(ex.getMessage());
        }
    }

    // 3) update food for a manager
    @PutMapping("/manager/{managerId}/update/{foodId}")
    public ResponseEntity<?> updateFoodForManager(
            @PathVariable Long managerId,
            @PathVariable Long foodId,
            @RequestBody Food updatedFood) {
        try {
            Food f = foodService.updateFoodForManager(managerId, foodId, updatedFood);
            return ResponseEntity.ok(f);
        } catch (RuntimeException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }
    
    @GetMapping("/available")
    public List<Food> getAvailableFoods() {
        return foodService.getAvailableFoods();
    }

}
