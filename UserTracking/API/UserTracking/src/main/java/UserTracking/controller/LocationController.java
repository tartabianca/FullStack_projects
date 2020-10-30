package UserTracking.controller;

import UserTracking.dto.LocationDTO;
import UserTracking.service.LocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.Date;
import java.util.List;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/location")
public class LocationController {

    @Autowired
    private LocationService locationService;

    @GetMapping("/getAllLocations")
    public List<LocationDTO> getAllLocations() throws ExecutionException, InterruptedException, ParseException {
        return locationService.getAllLocation();
    }

    @GetMapping()
    public LocationDTO getLocationById(@RequestParam("id") int id) throws ExecutionException, InterruptedException {
        return locationService.getLocationById(id);
    }

    @PostMapping("/newLocation")
    public LocationDTO createNewLocation(@RequestBody() LocationDTO locationDTO) throws Exception {
        return locationService.createNewLocation(locationDTO);
    }

    @PutMapping("/updateLocation")
    public LocationDTO updateLocation(@RequestBody() LocationDTO location) {
        return locationService.updateLocation(location);
    }

    @DeleteMapping("/deleteLocation")
    public String deleteLocationById(@RequestParam("id") int id) {
        return locationService.deleteLocation(id);
    }

    @PostMapping("/filter")
    public List<LocationDTO> filter(@RequestParam("startDate") Date startDate, @RequestParam("endDate") Date endDate, @RequestParam("userID") String userID) throws ExecutionException, InterruptedException {
        return locationService.filter(startDate, endDate, userID);
    }
}