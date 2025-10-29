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

    // DTO (Data Transfer Object) for incoming request
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
}
