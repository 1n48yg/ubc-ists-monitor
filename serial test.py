# Imports: serial is for receiving and sending serial signals, time and datetime
#          are for obtaining the current time, to record timestamps in the data
#          file
#######################################################
import serial
import time
import datetime
#######################################################


COMPORT = 'COM4'



# Python's way to mark the main function of a program, this is ran at the start
# of the program
if __name__ == '__main__':

    # This is for initializing a variable "ser" and associating it with
    # all signals coming from the COM3 port, for linux or raspberry pi the
    # port is likely /dev/ttyUCM0 or /dev/ttyUSB0
    #####################################################
    ser = serial.Serial(COMPORT, 9600, timeout=1)
    ser.reset_input_buffer()
    #####################################################

    # Opening up files that this script will operate on.
    # data.txt is the data file that stores the serial signals received from
    #   arduino, TODO: this will be changed to data.csv eventually
    # toggle.txt is a buffer file, in this script it is read, and if a valid
    #   command is received, it will send that instruction back to Arduino via
    #   a serial signal
    #####################################################
    # For reference, the second argument's meaning is specified:
    # a - is adding to a file
    # w - is overwriting the file
    # r - reading from the file
    #####################################################
    #data = open("data.txt", "a", buffering=4096)
    #toggle = open("toggle.txt", "r")
    #####################################################


    # Loop that will keep running until script is killed
    while True:
        
        # If the serial buffer has bytes coming in, basically if new data from
        # sensors is being read
        if ser.in_waiting > 0:
            # Code for recording the time that a line of sensor data was
            # obtained at
            #####################################################
            e = datetime.datetime.now()
            e = e.replace(microsecond=0)
            data = open("data.csv", "a", buffering=4096)
            data.write(str(e) + " ")
            #####################################################

            # nextLine is a variable that grabs the next line of serial data
            # sent, converts it to utf-8 format so it can be easily processed
            # as a string, and rstrip removes any invisible trailing characters
            # that might interfere with string manipulation.
            # the variable is then printed and recorded within the data file
            #####################################################
            nextLine = ser.readline().decode('utf-8').rstrip()
            print(str(e) + " " + nextLine)
            data.write(nextLine)
            data.write("\n")
            data.close()
            #####################################################

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
