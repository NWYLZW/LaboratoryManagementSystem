FROM lms:1.0.0.0

# 设置工作目录
WORKDIR /opt/project
# 将项目拷贝至工作目录下
COPY . /opt/project
# 构建镜像时，安装依赖文件
#RUN pip install --no-cache-dir -r ./requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
# 示例运行时启动项目
CMD python Main.py pro