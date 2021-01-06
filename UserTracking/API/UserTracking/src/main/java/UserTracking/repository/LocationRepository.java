package UserTracking.repository;

import UserTracking.entity.Location;
import UserTracking.service.FirebaseInitializer;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.CollectionReference;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.QuerySnapshot;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.concurrent.ExecutionException;

@Component
public class LocationRepository {

    @Autowired
    FirebaseInitializer db;

    public List<Location> findAll() throws ExecutionException, InterruptedException {
        List<Location> locationList = new ArrayList<>();
        CollectionReference locationCR = db.getFirebase().collection("Location");
        ApiFuture<QuerySnapshot> querySnapshot = locationCR.get();
        for (DocumentSnapshot doc : querySnapshot.get().getDocuments()) {
            locationList.add(doc.toObject(Location.class));
        }
        return locationList;
    }

    public Location save(Location location) {
        CollectionReference userCR = db.getFirebase().collection("Location");
        userCR.document(String.valueOf(location.getId())).set(location);
        return location;
    }

    public Location getById(int id) throws ExecutionException, InterruptedException {
        DocumentReference locationDR = db.getFirebase().collection("Location").document(String.valueOf(id));
        ApiFuture<DocumentSnapshot> documentSnapshot = locationDR.get();
        DocumentSnapshot doc = documentSnapshot.get();
        if (doc.exists()) {
            return doc.toObject(Location.class);
        } else {
            return null;
        }
    }

    public Location update(Location location) {
        CollectionReference locationCR = db.getFirebase().collection("Location");
        locationCR.document(String.valueOf(location.getId())).set(location);
        return location;
    }

    public void delete(int id) {
        db.getFirebase().collection("Location").document(String.valueOf(id)).delete();
    }

    public List<Location> filter(Date startDate, Date endDate, String userId) throws ExecutionException, InterruptedException {
        List<Location> locationList = new ArrayList<>();
        CollectionReference locationCR = db.getFirebase().collection("Location");
        ApiFuture<QuerySnapshot> querySnapshot = locationCR.get();
        for (DocumentSnapshot doc : querySnapshot.get().getDocuments()) {
            Location location = doc.toObject(Location.class);
            if(location.getStartDate().after(startDate) && location.getEndDate().before(endDate) && location.getUserID().equals(userId))
            locationList.add(location);
        }
        return locationList;
    }
}
