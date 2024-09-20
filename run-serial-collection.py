import serial
import time
import datetime
import os

COMPORT = '/dev/ttyACM1'

if __name__ == '__main__':

    ser = serial.Serial(COMPORT, 9600, timeout=1)
    ser.reset_input_buffer()

    while True:

        if ser.in_waiting > 0:
            current_time = datetime.datetime.now()
            current_time = current_time.replace(microsecond=0)
            current_date = datetime.datetime.now().date()

            # Extract the year, month, and file path
            year = current_date.year
            month = f"{current_date.month:02d}"
            directory_path = f"data/{year}/{month}"

            # Ensuring directories exist
            if not os.path.exists(directory_path):
                os.makedirs(directory_path)

            # Open corresponding csv file and append data to it
            file_path = f"{directory_path}/data_{year}-{month}-{current_date.day:02d}.csv"
            with open(file_path, "a", buffering=4096) as data:

                try:
                    # Read the serial data, decode it, and remove any trailing characters
                    nextLine = ser.readline().decode('utf-8').rstrip()
                    # Crude validity check
                    if (len(nextLine) < 100):
                        print(f"Error: {nextLine}\n")
                        continue
                except serial.SerialException as error:
                    print("Error reading serial data to Raspberry Pi")
                    time.sleep(5)
                    print("Attempting to restart connection")
                    ser = serial.Serial(COMPORT, 9600, timeout=1)
                    ser.reset_input_buffer()
                    continue

                print(f"{current_time}, {nextLine}")
                data.write(f"{current_time}, ")
                data.write(f"{nextLine}\n")





# Everything below this is an unfinished prototype for the control aspect, that requires more website permission setup


        # reads the current command within the toggle file, the contents of this
        # file is controlled by the user's input with the website
##        #####################################################
##        toggle = open("toggle.txt", "r")
##        toggleRead = toggle.read() #reads first line of file
##        toggle.seek(0, 0)          #returns file parser to beginning of file
##        toggle.flush()             #this is just in case to stop certain bugs
##
##        # depending on the line of text obtained, python will send an appropriate
##        # serial signal back to Arduino to take the necessary actions. This needs
##        # to be converted to byte format first to be sent via serial communication.
##        #
##        # For example: currently '9' is chosen for activating the LED, so if
##        #  we obtain the line of text "activate LED" from the toggle.txt file,
##        #  we will send the signal '9' to Arduino, which will then handle that
##        #  request by turning on the LED. If it receives another signal that is
##        #  not '9', it will close the LED.
##        if (toggleRead == "activate LED"):
##            ser.write('9'.encode())
##        else:
##            ser.write('0'.encode())
##        toggle.close();
        #####################################################
