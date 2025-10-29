package com.beyondinventory.backend.controllers;

import com.beyondinventory.backend.models.Location;
import com.beyondinventory.backend.repositories.LocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/locations")
@CrossOrigin(origins = "http://localhost:5173")
public class LocationController {

    @Autowired
    private LocationRepository locationRepository;

    // GET: Retrieve all locations
    @GetMapping
    public Iterable<Location> getAllLocations() {
        return locationRepository.findAll();
    }

    // POST: Create a new location
    @PostMapping
    public Location createLocation(@RequestBody Location newLocation) {
        return locationRepository.save(newLocation);
    }
}
