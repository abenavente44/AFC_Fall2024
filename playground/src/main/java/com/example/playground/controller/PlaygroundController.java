package com.example.playground.controller;

import com.example.playground.entity.Playground;
import com.example.playground.entity.Address;
import com.example.playground.service.PlaygroundService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class PlaygroundController {

    private final PlaygroundService playgroundService;

    public PlaygroundController(PlaygroundService playgroundService) {
        this.playgroundService = playgroundService;
    }

    @GetMapping("/playground")
    public ResponseEntity<List<Playground>> getPlayground(@RequestParam(required = false) String city) {
        List<Playground> playgrounds = playgroundService.findAllPlayground(city);
        return new ResponseEntity<>(playgrounds, HttpStatus.OK);

    }

    // Get a specific playground by its ID
    @GetMapping("/playground/{playgroundId}")
    public ResponseEntity<Playground> getPlaygroundById(@PathVariable Long playgroundId) {
        Playground playground = playgroundService.findPlaygroundById(playgroundId);
        return playground != null ? ResponseEntity.ok(playground) : ResponseEntity.notFound().build();
    }
    // Create a new playground and address
    @PostMapping("/playground")
    public ResponseEntity<Playground> createPlayground(@RequestBody Playground playground) {
        // Ensure that the Address is included in the Playground object
        if (playground.getAddress() == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);  // If no Address is provided, return an error
        }

        // Call the service to save Playground and Address
        Playground createdPlayground = playgroundService.createPlayground(
                playground.getLocation(),
                playground.getDescription(),
                playground.getRating(),
                playground.getFeedback(),
                playground.getDate(),
                playground.getAddress()
        );

        // Return the created Playground object with HTTP 201 Created status
        return new ResponseEntity<>(createdPlayground, HttpStatus.CREATED);
    }

    @PutMapping("/playground/{id}")
    public ResponseEntity<Playground> updatePlayground(
            @PathVariable Long id,
            @RequestBody Playground updatedPlayground) {

        try {
            Playground updatedData = playgroundService.updatePlayground(
                    id,
                    updatedPlayground.getLocation(),
                    updatedPlayground.getDescription(),
                    updatedPlayground.getRating(),
                    updatedPlayground.getFeedback(),
                    updatedPlayground.getDate(),
                    updatedPlayground.getAddress()
            );
            return ResponseEntity.ok(updatedData);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    @DeleteMapping("/playground/{id}")
    public ResponseEntity<Playground> deletePlayground(@PathVariable Long id) {
        playgroundService.deletePlayground(id);
        return ResponseEntity.noContent().build();
    }
}
