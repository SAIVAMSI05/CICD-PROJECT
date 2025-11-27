package com.klef.sdp.repository;

import com.klef.sdp.model.Food;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface FoodRepository extends JpaRepository<Food, Long> {

    @Query("select f.id from Food f where f.manager.id = :managerId")
    List<Long> findIdsByManagerId(@Param("managerId") Long managerId);

    @Modifying
    @Query("delete from Food f where f.manager.id = :managerId")
    void deleteByManagerId(@Param("managerId") Long managerId);

    // 🔍 FIND FOOD BY ID AND MANAGER (VERY IMPORTANT)
    @Query("select f from Food f where f.manager.id = :managerId and f.id = :foodId")
    Optional<Food> findByIdAndManagerId(@Param("foodId") Long foodId,
                                        @Param("managerId") Long managerId);
    
    List<Food> findByAvailableIgnoreCase(String available);

}
