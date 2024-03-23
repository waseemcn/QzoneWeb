package cn.net.wuxin.service;

import java.util.Random;

public class NumberService {
    Random random = new Random();

    public long get16int() {
        return random.nextInt(99999999) * 100000000L + random.nextInt(99999999);
    }
}
