package UserTracking.controller;

import UserTracking.dto.LocationDTO;
import UserTracking.service.LocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.Date;
import java.util.List;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/locations")
public class LocationController {

    @Autowired
    private LocationService locationService;

    @GetMapping()
    public ResponseEntity<List<LocationDTO>> getAllLocations() throws ExecutionException, InterruptedException, ParseException {
        return ResponseEntity.ok(locationService.getAllLocation());
    }

    @GetMapping("/{id}")
    public ResponseEntity<LocationDTO> getLocationById(@PathVariable int id) throws ExecutionException, InterruptedException {
        return ResponseEntity.ok(locationService.getLocationById(id));
    }

    @PostMapping("/newLocation")
    public ResponseEntity<LocationDTO> createNewLocation(@RequestBody() LocationDTO locationDTO) throws Exception {
        return ResponseEntity.ok(locationService.createNewLocation(locationDTO));
    }

    @PutMapping("/{id}")
    public ResponseEntity<LocationDTO> updateLocation(@PathVariable int id,@RequestBody() LocationDTO location) {
        return ResponseEntity.ok(locationService.updateLocation(id,location));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteLocationById(@PathVariable int id) {
        locationService.deleteLocation(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/filter")
    public ResponseEntity<List<LocationDTO>> filter(@RequestParam("startDate") Date startDate, @RequestParam("endDate") Date endDate, @RequestParam("userID") String userID) throws ExecutionException, InterruptedException {
        return ResponseEntity.ok(locationService.filter(startDate, endDate, userID));
    }
}