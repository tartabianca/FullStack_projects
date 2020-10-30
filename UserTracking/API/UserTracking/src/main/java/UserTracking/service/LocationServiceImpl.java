package UserTracking.service;

import UserTracking.dto.LocationDTO;
import UserTracking.entity.Location;
import UserTracking.mapper.LocationMapper;
import UserTracking.repository.LocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.concurrent.ExecutionException;

@Service
public class LocationServiceImpl implements LocationService {

    @Autowired
    LocationMapper locationMapper;

    @Autowired
    private LocationRepository locationRepository;

    public List<LocationDTO> getAllLocation() throws ExecutionException, InterruptedException {

        List<Location> locations = locationRepository.findAll();
        List<LocationDTO> locationDTO = new ArrayList<>();

        for (Location l : locations) {
            locationDTO.add(locationMapper.entityToDto(l));
        }
        return locationDTO;
    }

    public LocationDTO getLocationById(int id) throws ExecutionException, InterruptedException {
        LocationDTO locationDTO = locationMapper.entityToDto(locationRepository.getById(id));
        return locationDTO;

    }

    public LocationDTO createNewLocation(LocationDTO locationDTO) {
        int id = (int) (Math.random() * (99999999 - 10000000) + 10000000);
        locationDTO.setId(id);
        Location newLocation = locationRepository.save(locationMapper.dtoToEntity(locationDTO));
        return locationMapper.entityToDto(newLocation);
    }


    public LocationDTO updateLocation(LocationDTO locationDTO) {
        Location updatedLocation = locationRepository.update(locationMapper.dtoToEntity(locationDTO));
        return locationMapper.entityToDto(updatedLocation);
    }

    public String deleteLocation(int id) {
        String message = locationRepository.delete(id);
        return message;
    }

    public List<LocationDTO> filter(Date startDate, Date endDate, String userId) throws ExecutionException, InterruptedException{
        List<Location> locations = locationRepository.filter(startDate,endDate,userId);
        List<LocationDTO> locationDTO = new ArrayList<>();

        for (Location l : locations) {
            locationDTO.add(locationMapper.entityToDto(l));
        }
        return locationDTO;
    }


}
