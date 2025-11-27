package com.klef.sdp.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

@Entity
@Table(name = "food")
public class Food {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private double price;

    // Store availability as "YES"/"NO" or similar
    private String available;

    @ManyToOne
    @JoinColumn(name = "manager_id", nullable = false)
    private Manager manager;

    // Getters & Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }

    public String getAvailable() { return available; }
    public void setAvailable(String available) { this.available = available; }

    public Manager getManager() { return manager; }
    public void setManager(Manager manager) { this.manager = manager; }

    // Interpret availability string as boolean-like logic
    public boolean isAvailable() {
        return available != null && available.equalsIgnoreCase("YES");
    }

    @JsonProperty("availability")
    public String getAvailabilityStatus() {
        return isAvailable() ? "YES" : "NO";
    }
}