package UserTracking.service;

import UserTracking.dto.LocationDTO;
import UserTracking.dto.UserDTO;

import java.util.Date;
import java.util.List;
import java.util.concurrent.ExecutionException;

public interface LocationService {

    List<LocationDTO> getAllLocation() throws ExecutionException, InterruptedException;

    LocationDTO getLocationById(int id) throws ExecutionException, InterruptedException;

    LocationDTO createNewLocation(LocationDTO locationDTO) throws Exception;

    LocationDTO updateLocation(int id, LocationDTO locationDTO);

    void deleteLocation(int id);

    List<LocationDTO> filter(Date startDate, Date endDate, String userId) throws ExecutionException, InterruptedException;

}
