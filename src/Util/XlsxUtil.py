# TODO 生成xlsx文件的帮助类
import os
import random
import time

import xlwt

from src.Util.FileUtil import fileUtil


class XlsxUtil():
    def __listToXlsx(self, ListX: list):
        i = 0
        j = 0
        workbook = xlwt.Workbook(encoding='UTF-8')
        bookSheet = workbook.add_sheet('Sheet1', cell_overwrite_ok=True)
        for x in ListX:
            for y in x:
                bookSheet.write(i, j, y)
                j += 1
            j = 0
            i += 1
        mid = self.getExcelName('%Y_%m_%d_%H_%M_%S')
        workbook.save(mid)
        file = open(mid, mode='r')
        file.close()
        return file

    """
    根据nametype的格式生成当前时间的流水文件
    """

    def getExcelName(self, nametype):
        return time.strftime(nametype) + '_' + str(random.randint(1, 1000)) + '.xls'

    def listTORepones(self, List: list, fileName: str):
        file = self.__listToXlsx(List)
        response = fileUtil.makeReponse(file, fileName)
        os.remove(file.name)
        return response
xlsxUtil = XlsxUtil()