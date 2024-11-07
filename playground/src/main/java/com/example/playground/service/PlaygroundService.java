package com.example.playground.service;


import com.example.playground.entity.Playground;
import com.example.playground.repository.PlaygroundRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;


@Service
public class PlaygroundService {

    @Autowired
    private PlaygroundRepository playgroundRepository;

    public Playground findPlaygroundById(Long id) {
        return playgroundRepository.findById(id).get();
    }

    public List<Playground> findAllPlayground(String city) {
        if (city != null) {
            return playgroundRepository.findAll();
        }
        return playgroundRepository.findByAddress(city);
    }


    public Playground savePlayground(Playground myPlayground) {
        return playgroundRepository.save(myPlayground);
    }

    public Playground updatePlayground(Long id, Playground myPlayground) {

        Playground playgroundFound = playgroundRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Playground not found with id: " + id));


        myPlayground.setId(playgroundFound.getId());


        return playgroundRepository.save(myPlayground);
    }

    public void deletePlayground(Long id) {
        playgroundRepository.deleteById(id);
    }
}

