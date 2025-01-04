import { CameraView, useCameraPermissions } from 'expo-camera';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from "react-native";
import { MaterialIcons } from '@expo/vector-icons';

import { useRef, useState } from 'react';

const Camera = () => {

    const cameraRef = useRef();

    const [facing, setFacing] = useState('back');

    const [permission, requestPermission] = useCameraPermissions();

    if (!permission) {
        // Camera permissions are still loading.
        return <View />;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet.
        return (
        <View style={styles.container}>
            <Text style={styles.message}>We need your permission to show the camera</Text>
            <Button onPress={requestPermission} title="grant permission" />
        </View>
        );
    }

    function toggleCameraFacing() {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    }

    const handleTakePicture = async () => {
        const res = await cameraRef.current?.takePictureAsync({ base64: true, exif: true });
    }

    return (
            <View style={styles.container}>
                <CameraView
                    ref={cameraRef}
                    style={styles.camera} facing={facing}>
                    <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button}
                        onPress={handleTakePicture}>
                        <Text style={styles.text}>Take shot</Text>
                    </TouchableOpacity>
                    </View>
                </CameraView>
            </View>
        );
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
        },
        message: {
            textAlign: 'center',
            paddingBottom: 10,
        },
        camera: {
            flex: 1,
        },
        buttonContainer: {
            flex: 1,
            flexDirection: 'row',
            backgroundColor: 'transparent',
            margin: 64,
        },
        button: {
            flex: 1,
            alignSelf: 'flex-end',
            alignItems: 'center',
        },
        text: {
            fontSize: 24,
            fontWeight: 'bold',
            color: 'white',
        }
    });


export default Camera;