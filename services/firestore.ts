import firebase from "firebase";
import "firebase/firestore";
import store from "../state/store";
import { firebaseConfig } from "./firebaseConfig";
import uuid from "react-native-uuid";
import * as ImagePicker from "expo-image-picker";
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const dbh = firebase.firestore();

const data = [
  { name: "Mobile Phone", points: 30 },
  { name: "Tablet", points: 40 },
  { name: "Laptop", points: 60 },
  { name: "Desktop", points: 80 },
  { name: "Monitor", points: 50 },
];

export const getHistory = async (userId: any, callback: Function) => {
  console.log("Callback: " + callback);
  // const records = await dbh
  //   .collection("history")
  //   .where("user", "==", userId.uid)
  //   .orderBy("_createdAt", "desc")
  //   .get();
  const querySnapshot = await dbh
    .collection("history")
    .where("user", "==", userId.uid)
    .orderBy("_createdAt", "desc")
    .onSnapshot((querySnapshot: any) => {
      const data: any = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id.substr(0, 8), ...doc.data() });
      });
      callback(data);
    });
  // return records.docs.map((x) => {
  //   return { ...x.data(), id: x.id.substr(0, 8) };
  // });
};

export const createNewUserRecord = async (userId: string) => {
  dbh.collection("user").doc(userId).set({
    reward: 0,
  });
};

export const getUserRecord = async (userId: string) => {
  console.log("userId : " + userId);
  const record = await dbh.collection("user").doc(userId).get();
  console.log("current user reward: " + record.data()!.reward);
  store.dispatch({ type: "READ_REWARD", reward: record.data()!.reward });
};

export const addDepositRecord = async (
  userId: any,
  dropoffPoint: any,
  recycledObject: any,
  beforeImage: any,
  // afterImage: any,
  currentPoints: number
) => {
  const points = data.filter((x) => x.name == recycledObject)[0].points ?? 0;
  dbh.collection("history").add({
    _createdAt: firebase.firestore.Timestamp.now(),
    user: userId,
    location: dropoffPoint,
    recycledObject: recycledObject,
    beforeImage: beforeImage,
    // afterImage: afterImage,
    points: points,
  });
  dbh
    .collection("user")
    .doc(userId)
    .update({ reward: currentPoints + points });
  getUserRecord(userId);
};

export const uploadImageAsync = async (uri: string) => {
  // Why are we using XMLHttpRequest? See:
  // https://github.com/expo/expo/issues/2402#issuecomment-443726662
  const blob: any = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      console.log(e);
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });

  const ref = firebase.storage().ref().child(uuid.v4().toString());
  const snapshot = await ref.put(blob);

  // We're done with the blob, close and release it
  blob.close();

  return await snapshot.ref.getDownloadURL();
};

export const pickImage = async (
  callbackUploading: Function,
  callbackImage: Function
) => {
  let pickerResult = await ImagePicker.launchImageLibraryAsync({
    allowsEditing: true,
    aspect: [4, 3],
  });

  //   console.log({ pickerResult });
  handleImagePicked(pickerResult, callbackUploading, callbackImage);
};

const handleImagePicked = async (
  pickerResult: ImagePicker.ImagePickerResult,
  callbackUploading: Function,
  callbackImage: Function
) => {
  try {
    callbackUploading(true);

    if (!pickerResult.cancelled) {
      const uploadUrl = await uploadImageAsync(pickerResult.uri);
      callbackImage(uploadUrl);
    }
  } catch (e) {
    console.log(e);
    alert("Upload failed, sorry :(");
  } finally {
    callbackUploading(false);
  }
};
