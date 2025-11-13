package com.beyondinventory.backend.controllers;

import com.beyondinventory.backend.models.Item;
import com.beyondinventory.backend.models.Location;
import com.beyondinventory.backend.repositories.ItemRepository;
import com.beyondinventory.backend.repositories.LocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/items")
@CrossOrigin(origins = "http://localhost:5173")
public class ItemController {

    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private LocationRepository locationRepository;

    // DTO (Data Transfer Object) for incoming POST request
    public static class CreateItemRequest {
        public String name;
        public String description;
        public Long locationId;
    }

    // GET: Retrieve all items
    @GetMapping
    public Iterable<Item> getAllItems() {
        return itemRepository.findAll();
    }

    // POST: Create a new item with locationId
    @PostMapping
    public Item createItem(@RequestBody CreateItemRequest request) {

        Location location = locationRepository.findById(request.locationId)
                .orElseThrow(() -> new RuntimeException("Location not found"));

        Item newItem = new Item(request.name, location, request.description);
        return itemRepository.save(newItem);
    }

    // DELETE: Remove an item by its ID
    @DeleteMapping("/{id}")
    public void deleteItem(@PathVariable Long id) {
        itemRepository.deleteById(id);
    }

    // ⭐ NEW PUT: Update an existing item using frontend shape
    @PutMapping("/{id}")
    public Item updateItem(@PathVariable Long id, @RequestBody Item updatedItem) {

        // Find existing item
        Item existingItem = itemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Item not found"));

        // Update name & description
        existingItem.setName(updatedItem.getName());
        existingItem.setDescription(updatedItem.getDescription());

        // Handle location object sent from React:
        // updatedItem.location.name
        if (updatedItem.getLocation() != null && updatedItem.getLocation().getName() != null) {
            String locationName = updatedItem.getLocation().getName();

            // Try to find the location by name
            Location location = locationRepository.findByName(locationName);

            // If not found, create it
            if (location == null) {
                location = new Location();
                location.setName(locationName);
                location = locationRepository.save(location);
            }

            existingItem.setLocation(location);
        }

        // Save updated item
        return itemRepository.save(existingItem);
    }
}
