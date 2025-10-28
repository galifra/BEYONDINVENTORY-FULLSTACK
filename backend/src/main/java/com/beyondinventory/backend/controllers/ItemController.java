package com.beyondinventory.backend.controllers;

import com.beyondinventory.backend.models.Item;
import com.beyondinventory.backend.repositories.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/items")
@CrossOrigin(origins = "http://localhost:5173") // allows frontend to call API later
public class ItemController {

    @Autowired
    private ItemRepository itemRepository;

    // GET: Retrieve all items
    @GetMapping
    public Iterable<Item> getAllItems() {
        return itemRepository.findAll();
    }

    // POST: Create a new item
    @PostMapping
    public Item createItem(@RequestBody Item newItem) {
        return itemRepository.save(newItem);
    }
}
