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
    // DELETE: Remove a location by ID
    @DeleteMapping("/{id}")
    public void deleteLocation(@PathVariable Long id) {
        locationRepository.deleteById(id);
    }

    // PUT: Update an existing location
    @PutMapping("/{id}")
    public Location updateLocation(@PathVariable Long id, @RequestBody Location updatedLocation) {
        Location existingLocation = locationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Location not found"));

        existingLocation.setName(updatedLocation.getName());

        return locationRepository.save(existingLocation);
    }


}
