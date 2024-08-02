import math
import time
import random
import string
#import validate
import sys

def encode(data):
    #print(data)
    dic = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~ '  # 生成字典
    #print(dic)
    salt_list = []  # 生成干扰字典
    for i in range(59, 127):
        if chr(i) != "!" and chr(i) != "-" and chr(i) !='+':
            salt_list.append(chr(i))
    for i in range(32, 46):
        if chr(i) != "!" and chr(i) != "-" and chr(i) !='+':
            salt_list.append(chr(i))
    v = time.time()
    v=int(round(v*1000))
    timestamp = v
    v = str(v)
    l = []
    for i in v:
        # 干扰时间戳
        l.append(str(i)+salt_list[random.randint(0, len(salt_list)-1)])
    overtime = [6,3,0,7,2,0,0,0,0]  # 设置延时30秒
    tmpkey = ['!']
    for i in overtime:
        # 对演示数据进行加密
        tmpkey.append(str(i)+salt_list[random.randint(0, len(salt_list)-1)])
    key = ''.join(l)+''.join(tmpkey)
    tmp = []
    numberdata = []
    verify_code_data=random.randint(1, 9)
    for i in data:
        for j in range(0, len(dic)-1):
            if dic[j] == i:
                tmpl=j+verify_code_data  
                if(len(str(tmpl))==1):
                    tmp.append('0'+str(tmpl)+salt_list[random.randint(0, len(salt_list)-1)])  # 加密原数据
                else:
                    tmp.append(str(tmpl)+salt_list[random.randint(0, len(salt_list)-1)]) 
                numberdata.append(j)
    #print(numberdata)
    #print(salt_list)
    #print(','.join(dic).split(','))
    result = ''.join(tmp)+"-"+key+"+"+str(verify_code_data)+'.'+str(numberdata[0])  # 把原数据和钥匙加密
    return result  # 返回结果


def decode(data):
    dic = string.printable  # 生成字典
    salt_list = []  # 生成干扰字典
    for i in range(59, 127):
        if chr(i) != "!":
            salt_list.append(chr(i))
    for i in range(32, 46):
        if chr(i) != "!":
            salt_list.append(chr(i))

    tmplist = []
    for i in data:
        if i not in salt_list:
            tmplist.append(i)
    tmp = ''.join(tmplist)
    print(tmp)
    tmplist = tmp.split(',')
    # 加密
    result_list = []
    for i in tmplist:
        if '!' not in i:
            result_list.append(dic[int(i)])
    result = ''.join(result_list)  # 生成结果
    auth = tmplist[len(tmplist)-1].split('!')
    t = time.time()
    # 检验是否超时，如果超时则不提供解密结果
    print(auth[0])
    if t > eval(auth[0])+eval(auth[1]) or t < eval(auth[0]):
        return 'failed'
    else:
        return str(result)
print(encode(sys.argv[1]))

