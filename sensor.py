import time
import RPi.GPIO as GPIO
import Adafruit_DHT
from Adafruit_ADS1x15 import ADS1115

# Setup GPIO to suppress warnings
GPIO.setwarnings(False)

# Setup for DHT11 Sensor
DHT_SENSOR = Adafruit_DHT.DHT11
DHT_PIN = 4  # GPIO pin connected to DHT11

# Setup for HC-SR04 Ultrasonic Sensor (for distance measurement)
TRIG = 33
ECHO = 35

# Setup for ADS1115 (Analog to Digital Converter) for LDR (Light Sensor)
adc = ADS1115()
GAIN = 1  # Gain set to 1 (default)

# Setup GPIO for Ultrasonic Sensor
GPIO.setmode(GPIO.BCM)
GPIO.setup(TRIG, GPIO.OUT)
GPIO.setup(ECHO, GPIO.IN)

def read_temperature_humidity():
    """Reads temperature and humidity from the DHT11 sensor."""
    humidity, temperature = Adafruit_DHT.read(DHT_SENSOR, DHT_PIN)
    if humidity is not None and temperature is not None:
        return temperature, humidity
    return None, None

def read_distance():
    """Reads distance using HC-SR04 Ultrasonic Sensor."""
    GPIO.output(TRIG, GPIO.HIGH)
    time.sleep(0.00001)
    GPIO.output(TRIG, GPIO.LOW)

    pulse_start = time.time()
    pulse_end = time.time()

    while GPIO.input(ECHO) == 0:
        pulse_start = time.time()

    while GPIO.input(ECHO) == 1:
        pulse_end = time.time()

    pulse_duration = pulse_end - pulse_start
    distance = pulse_duration * 17150  # Convert time to cm
    return round(distance, 2)

def read_light():
    """Reads the light intensity from LDR using ADS1115."""
    light_value = adc.read_adc(0, gain=GAIN)  # Read from channel A0
    return light_value

def print_data(temperature, humidity, distance, light_value):
    """Prints the data to the console."""
    print(f"Temp={temperature}°C, Humidity={humidity}%, Distance={distance}cm, Light={light_value}")

try:
    while True:
        # Read sensor values
        temperature, humidity = read_temperature_humidity()
        distance = read_distance()
        light_value = read_light()

        # Print the data if temperature and humidity are valid
        if temperature is not None and humidity is not None:
            print_data(temperature, humidity, distance, light_value)

        # Wait before sending the next data
        time.sleep(5)

except KeyboardInterrupt:
    print("Exiting program.")

finally:
    # Ensure GPIO cleanup
    GPIO.cleanup()

