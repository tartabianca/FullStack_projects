package UserTracking.mapper;

import UserTracking.dto.LocationDTO;
import UserTracking.entity.Location;
import org.springframework.stereotype.Component;

@Component
public class LocationMapper {

    public LocationDTO entityToDto(Location location) {
        LocationDTO locationDTO = new LocationDTO();
        locationDTO.setId(location.getId());
        locationDTO.setLatitude(location.getLatitude());
        locationDTO.setLongitude(location.getLongitude());
        locationDTO.setStartDate(location.getStartDate());
        locationDTO.setEndDate(location.getEndDate());
        locationDTO.setUserID(location.getUserID());
        return locationDTO;
    }

    public Location dtoToEntity(LocationDTO locationDTO) {
        Location location = new Location();
        location.setId(locationDTO.getId());
        location.setLatitude(locationDTO.getLatitude());
        location.setLongitude(locationDTO.getLongitude());
        location.setStartDate(locationDTO.getStartDate());
        location.setEndDate(locationDTO.getEndDate());
        location.setUserID(locationDTO.getUserID());
        return location;
    }
}
