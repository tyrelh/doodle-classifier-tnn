
String IMG_TYPE = "tshirt";

int IMG_SIZE = 784;
byte[] data = loadBytes("data/unprocessed/" + IMG_TYPE + ".npy");

byte[] out_data_100 = new byte[100 * IMG_SIZE];
byte[] out_data_1000 = new byte[1000 * IMG_SIZE];
byte[] out_data_10000 = new byte[10000 * IMG_SIZE];
byte[] out_data_100000 = new byte[100000 * IMG_SIZE];

int out_index = 0;
for (int n = 0; n < 100; n++) {
  int start = 80 + n * IMG_SIZE;
  for (int i = 0; i < IMG_SIZE; i++) {
    int index = i + start;
    byte val = data[index];
    out_data_100[out_index] = val;
    out_index++;
  }
}

out_index = 0;
for (int n = 0; n < 1000; n++) {
  int start = 80 + n * IMG_SIZE;
  for (int i = 0; i < IMG_SIZE; i++) {
    int index = i + start;
    byte val = data[index];
    out_data_1000[out_index] = val;
    out_index++;
  }
}

out_index = 0;
for (int n = 0; n < 10000; n++) {
  int start = 80 + n * IMG_SIZE;
  for (int i = 0; i < IMG_SIZE; i++) {
    int index = i + start;
    byte val = data[index];
    out_data_10000[out_index] = val;
    out_index++;
  }
}

out_index = 0;
for (int n = 0; n < 100000; n++) {
  int start = 80 + n * IMG_SIZE;
  for (int i = 0; i < IMG_SIZE; i++) {
    int index = i + start;
    byte val = data[index];
    out_data_100000[out_index] = val;
    out_index++;
  }
}

saveBytes(IMG_TYPE + "s100.bin", out_data_100);
saveBytes(IMG_TYPE + "s1000.bin", out_data_1000);
saveBytes(IMG_TYPE + "s10000.bin", out_data_10000);
saveBytes(IMG_TYPE + "s100000.bin", out_data_100000);

size(280, 280);