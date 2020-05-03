# TODO 生成xlsx文件的帮助类
import os
import random
import time

import xlwt


class XlsxUtil():
    def listToXlsx(self, ListX: list):
        i = 0
        j = 0
        workbook = xlwt.Workbook(encoding='UTF-8');
        bookSheet = workbook.add_sheet('Sheet1', cell_overwrite_ok=True)
        for x in ListX:
            for y in x:
                bookSheet.write(i, j, y)
                j += 1
            j = 0
            i += 1
        mid = time.strftime('%Y_%m_%d_%H_%M_%S') + '_' + str(random.randint(1, 1000)) + '.xls'
        workbook.save(mid)
        file = open(mid, mode='r');
        file.close()
        os.remove(mid)
        return file
