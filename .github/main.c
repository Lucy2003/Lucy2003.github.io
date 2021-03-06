#include <dirent.h>
#include <stdio.h>
#include <string.h>
#include <sys/stat.h>
#include <sys/types.h>
#include <time.h>

#define MAX_PATH_LEN 512
#define stricmp strcasecmp

static long trave_dir(char *path, char *parentPath, int prefixlen)
{
	DIR *d = NULL;
	struct dirent *dp = NULL; /* readdir函数的返回值就存放在这个结构体中 */
	struct stat st;
	char p[MAX_PATH_LEN] = {0};
	FILE *fout = NULL;
	char filelistPath[MAX_PATH_LEN] = {0};
	sprintf(filelistPath, "%s/filelist.json", path);
	long itemcount = 0;

	if (stat(path, &st) < 0 || !S_ISDIR(st.st_mode))
	{
		printf("invalid path: %s\n", path);
		return -1;
	}

	if (!(d = opendir(path)))
	{
		printf("opendir[%s] error\n", path);
		return -1;
	}
	fout = fopen(filelistPath, "w");
	if (!fout)
	{
		printf("Open filelist error:%s\n", filelistPath);
		return -1;
	}
	
	time_t t = time(0); 
    char tmp[64]; //Time
    strftime(tmp, sizeof(tmp), "%Y/%m/%d %X %A %z",localtime(&t)); 
	
	// Print Header
	fprintf(fout, "{\n");
	fprintf(fout, "\t\"parentPath\":\"%s/\",\n", parentPath + prefixlen);
	fprintf(fout, "\t\"updateTime\":\"%s\",\n",tmp);
	fprintf(fout, "\t\"list\":[\n");

	while ((dp = readdir(d)) != NULL)
	{
		/* 把当前目录.，上一级目录..及隐藏文件都去掉，避免死循环遍历目录 */
		if ((!strncmp(dp->d_name, ".", 1)) || (!strncmp(dp->d_name, "..", 2)))
			continue;

		snprintf(p, MAX_PATH_LEN, "%s/%s", path, dp->d_name);
		stat(p, &st);

		
		if (!S_ISDIR(st.st_mode))
		{ // File
			// printf("%s\n", p);
			if (!stricmp(dp->d_name, "filelist.json"))
				continue; //去除列表文件

			fprintf(fout,
					"\t\t{\n\t\t\t"
					"\"name\":\"%s\",\n\t\t\t"
					"\"path\":\"%s\",\n\t\t\t"
					"\"size\":%ld,\n\t\t\t"
					"\"type\":\"File\"\n\t\t\t"
					"},\n",
					dp->d_name, p + prefixlen, st.st_size);
		}
		else
		{ // Dir
			printf("Processing Dir:  %s/\n", p);
			fprintf(fout,
					"\t\t{\n\t\t\t"
					"\"name\":\"%s\",\n\t\t\t"
					"\"path\":\"%s\",\n\t\t\t"
					"\"type\":\"Dir\"\n\t\t},\n",
					dp->d_name, p + prefixlen);
			long ret = trave_dir(p, path, prefixlen);
			if (ret == -1)
			{
				itemcount = -1;
				break;
			}
		}
		itemcount++;
	}
	closedir(d);
	// Print Footer
	fprintf(fout, "\t\t{}\n\t],\n\t\"itemcount\":%ld\n}", itemcount);

	fflush(fout);
	fclose(fout);
	return itemcount;
}

int main(int argc, char **argv)
{
	char *path = NULL;

	if (argc != 2)
	{
		printf("Usage: %s [dir]\n", argv[0]);
		printf("use DEFAULT option: %s .\n", argv[0]);
		printf("-------------------------------------------\n");
		path = ".";
	}
	else
	{
		path = argv[1];
	}
	if (trave_dir(path, path, strlen(path)) != -1)
	{
		printf("\nAll done.");
		return 0;
	}
	else
	{
		printf("\nExit with error.");
		return -1;
	}
}