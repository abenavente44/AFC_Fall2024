package com.example.playground.controller;

import com.example.playground.entity.Playground;
import com.example.playground.service.PlaygroundService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/api")

public class PlaygroundController {
    final private PlaygroundService playgroundService;

    public PlaygroundController(PlaygroundService playgroundService) {
        this.playgroundService = playgroundService;
    }
    //    @GetMapping("/playground")
//    public ResponseEntity<List<Playground>> getPlayground() {
//        List<Playground> playgrounds = playgroundService.findAllPlayground();
//        return new ResponseEntity<>(playgrounds, HttpStatus.OK);
//
//    }
//    @GetMapping("/playground/{playgroundId}")
//    public ResponseEntity<Playground> getPlaygroundById(@PathVariable Long playgroundId) {
//        Playground playgrounds = playgroundService.findPlaygroundById(playgroundId);
//        return new ResponseEntity<>(playgrounds, HttpStatus.OK);
//    }
    @GetMapping("/playground")
    public List<Playground> getPlayground() {
    return playgroundService.findAllPlayground();
    }

//   @GetMapping("/playground/{playgroundId}")
//   public Playground getPlaygroundById(@PathVariable Long playgroundId) {
//       return playgroundService.findPlaygroundById(playgroundId);
//   }

    @GetMapping("/playground/{playgroundLocation}")
    public Playground getPlaygroundByLocation(@PathVariable String playgroundLocation) {
        return playgroundService.findPlaygroundByLocation(playgroundLocation);
    }

    @PostMapping("/playground")
    public ResponseEntity<Playground> createPlayground(@RequestBody Playground playground) {
        return ResponseEntity.ok( playgroundService.savePlayground(playground));
    }
    @PutMapping("/playground/{playgroundId}")
    public ResponseEntity<Playground> updatePlayground(
            @PathVariable Long playgroundId,
            @RequestBody Playground myPlayground) {

        // Log the incoming inventory details
        System.out.println(myPlayground);

        // Find the existing inventory by ID
//        Playground existingPlayground = playgroundService.findPlaygroundById(playgroundId);

//        if (existingPlayground == null) {
//            // Return 404 Not Found if the inventory does not exist
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
//        }

        // Update the inventory using the service
        Playground updatedPlayground = playgroundService.updatePlayground(playgroundId, myPlayground);

        // Return the updated inventory with a 200 OK status
        return ResponseEntity.ok(updatedPlayground);
    }
    @DeleteMapping("/playground/{id}")
    public ResponseEntity<Playground> deletePlayground(@PathVariable Long id) {
        playgroundService.deletePlayground(id);
        return ResponseEntity.noContent().build();
    }



}
