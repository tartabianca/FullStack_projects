package UserTracking.repository;

import UserTracking.entity.User;
import UserTracking.service.FirebaseInitializer;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.CollectionReference;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.QuerySnapshot;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

@Component
public class UserRepository {

    @Autowired
    FirebaseInitializer db;

    public List<User> findAll() throws ExecutionException, InterruptedException {
        List<User> userList = new ArrayList<>();
        CollectionReference userCR = db.getFirebase().collection("User");
        ApiFuture<QuerySnapshot> querySnapshot = userCR.get();
        for (DocumentSnapshot doc : querySnapshot.get().getDocuments()) {
            userList.add(doc.toObject(User.class));
        }
        return userList;
    }

    public User save(User user) {
        CollectionReference userCR = db.getFirebase().collection("User");
        userCR.document(String.valueOf(user.getTokenID())).set(user);
        return user;
    }

    public User getById(String id) throws ExecutionException, InterruptedException {
        DocumentReference userDR = db.getFirebase().collection("User").document(id);
        ApiFuture<DocumentSnapshot> documentSnapshot = userDR.get();
        DocumentSnapshot doc = documentSnapshot.get();
        if (doc.exists()) {
            return doc.toObject(User.class);
        } else {
            return null;
        }
    }

    public User update(User user) throws ExecutionException, InterruptedException {
        DocumentReference userDR = db.getFirebase().collection("User").document(user.getTokenID());
        ApiFuture<DocumentSnapshot> documentSnapshot = userDR.get();
        DocumentSnapshot doc = documentSnapshot.get();
        user.setRoles(doc.toObject(User.class).getRoles());
        userDR.set(user);
        return user;
    }

    public String delete(String id) {
        db.getFirebase().collection("User").document(id).delete();
        return "Deleted user with id: " + id;
    }

    public User login(String email, String password) throws ExecutionException, InterruptedException {
        User user = new User();
        boolean found = false;
        CollectionReference userCR = db.getFirebase().collection("User");
        ApiFuture<QuerySnapshot> querySnapshot = userCR.get();
        for (DocumentSnapshot doc : querySnapshot.get().getDocuments()) {
            user = doc.toObject(User.class);
            if (user.getEmail().equals(email) && user.getPassword().equals(password)) {
                found = true;
                break;
            }
        }
        if (found) {
            return user;
        } else {
            return null;
        }
    }
}
